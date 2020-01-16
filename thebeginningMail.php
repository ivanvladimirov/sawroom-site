<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim('SawRoom: The Beginning');

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "denial";
            exit;
        }

        // Set the recipient email address.
        $recipient = $_POST["email"];

        // Set the email subject.
        $subject = "Потвърдена резервация за SawRoom: The Beginning";

        // Build the email content.
        $email_content_self = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0;padding: 0;font-family: \'Lora\', sans-serif;color: white !important;font-weight: bold;background-color: #0d0d0d;">
                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;background-color: black;width: 475px;margin: 0 auto;overflow: hidden;box-shadow: 0px 0px 50px black;">
                    <tr>
                        <td style="font-family: \'Roboto\', sans-serif;padding: 30px 80px;font-size: 13px;font-weight: normal;color: white !important;">
<span style="color: #000000">'.$_POST["date"].' в '.$_POST["hour"].' ч.</span>
                        <span style="margin-top: 20px;width:38px; height:38px;display:block;margin: 0 auto;margin-bottom: 20px;background-image: url(https://www.sawroom.bg/email/logo.png);background-size: 38px 38px;background-color: black;padding-right: 10px;background-repeat: no-repeat;color: black;text-indent: 9999px;font-size: 25px;line-height: 38px"></span>
Има нова резервация за SawRoom: The Beginning!<br><br> 
<strong>Детайли за резервацията:</strong><br>
<ol>
    <li>Име: '.$_POST["name"].'</li>
    <li>Дата: '.$_POST["date"].' в '.$_POST["hour"].' ч.</li>
    <li>Играчи: '.$_POST["people"].'</li>
    <li>Телефон: '.$_POST["phone"].'</li>
    <li>Имейл: '.$_POST["email"].'</li>
    <li>Език: '.$_POST["language"].'</li>
    <li>Име на отбор: '.$_POST["teamname"].'</li>
    <li>Game Mode: '.$_POST["gamemode"].'</li>
</ol> 
<br><span style="color: #be0000;">Kill Them!<br>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        ';

        $email_content = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0;padding: 0;font-family: \'Lora\', sans-serif;color: white !important;font-weight: bold;background-color: #0d0d0d;">
                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;background-color: black;width: 700px;margin: 0 auto;overflow: hidden;box-shadow: 0px 0px 50px black;">
                    <tr>
                        <td style="font-family: \'Roboto\', sans-serif;text-align: center;padding: 30px 80px;font-size: 13px;font-weight: normal;color: white !important;">
<span style="margin-top: 20px;width:38px; height:38px;display:block;margin: 0 auto;margin-bottom: 20px;background-image: url(https://www.sawroom.bg/email/logo.png);background-size: 38px 38px;background-color: black;padding-right: 10px;background-repeat: no-repeat;color: black;text-indent: 9999px;font-size: 25px;line-height: 38px"></span>
Здравей, '.$_POST["name"].'!<br><br> 
Успешно резервира час за SawRoom: The Beginning на '.$_POST["date"].' в '.$_POST["hour"].' ч.
<br><span style="color: white">Нямаме търпение да те посрещнем и да чуем писъците ти!<br><br></span>
<span style="color: white">Добре е да сте на адреса ни (ул. Любен Каравелов №68) поне 15 минути преди часа ви.<br></span>
<span style="color: white">До скоро!</span>
                        </td>
                    </tr>
                </table>
        </body>
        </html>';

        // Build the email headers.
        $email_headers = "From: SawRoom <contact@sawroom.bg>\r\n";
        $email_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers) && mail("contact@sawroom.bg", "SawRoom: New Reservation", $email_content_self, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "success";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "denial";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "denial";
    }

?>
