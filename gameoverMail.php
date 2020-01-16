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
        $message = trim('SawRoom 3: Game Over');

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
        $subject = "Потвърдена резервация за SawRoom 3: Game Over";

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
Има нова резервация за SawRoom 3: Game Over!<br><br> 
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
Успешно резервира час за SawRoom 3: Game Over на '.$_POST["date"].' в '.$_POST["hour"].' ч.
<br><span style="color: white">Нямаме търпение да посрещнем теб и отбора ти с касапските ни инструменти!<br><br>
Ще ви очакваме на нашия адрес 15 минути преди часа ви за резервация! Имайте предвид, че ако закъснеете повече от 15 минути след часа ви, то той се отменя и няма как да ви пуснем да играете.<br><br>
Умоляваме те предварително да прочетеш всички правила, които се намират по-долу в този имейл и да ги пратиш на останалите съотборници, тъй като SawRoom 3 е доста по-специална от другите ни стаи, което прави тези правила значително важни!<br>Също така ви молим да дойдете с удобни за бягане дрехи и в никакъв случай с токчета или костюми!<br></span>
<span style="color: white">(Можеш да препратиш чрез този <a href="https://sawroom.bg/rules/" style="color: white; text-decoration: underline;">линк</a>)</span>
                        </td>
                    </tr>
                </table>
                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;background-color: black;color: white !important;background-image: url(https://www.sawroom.bg/email/john.jpg);background-position: right center;background-repeat: no-repeat;width: 700px;margin: 0 auto;overflow: hidden;box-shadow: 0px 0px 50px black;">
                        <tr style="padding-top: 10px;" valign="top">
                            <td valign="middle"><hr style="font-family: \'Lora\', sans-serif;margin-top: 25px;height: 1px;background: transparent;color: transparent;border-top: 4px solid red; width: 100%;"></td>
                            <td style="font-family: \'Lora\', sans-serif;text-align: center;width: 460px;"><span style="text-align: center;margin-top: 20px;font-size: 24px;background-color: black;padding: 0 7px;height: 38px;display: inline-block;vertical-align: top;line-height: 38px;">SawRoom 3: Game Over <span style="font-style:italic">Guidelines</span></span></td>
                            <td valign="middle"><hr style="font-family: \'Lora\', sans-serif;margin-top: 25px;height: 1px;background: transparent;color: transparent;border-top: 4px solid red; width: 100%;"></td>
                        </tr>
                        <tr>
                            <td colspan="3"><h1 style="font-family: \'Lora\', sans-serif;margin-top: 70px;margin-left: 50px;word-spacing: 9999px;line-height: 27px;color: white !important;">Основни правила</h1><hr style="margin-left: 50px;height: 1px;background: transparent;color: transparent;border-top: 4px solid red; width: 62px;margin-top: -10px;"></td>
                        </tr>
                        <tr>
                            <td colspan="3"><h1 style="font-family: \'Lora\', sans-serif;font-size: 22px;margin-top: 30px;margin-left: 50px;color: white !important;"><span style="color: #be0000">1.</span> Не оказвайте съпротива</h1></td>
                        </tr>
                        <tr>
                            <td colspan="3"><p style="font-family: \'Lora\', sans-serif;font-size: 16px;width:70%;margin-top: 0px;margin-left: 50px;color: white !important;">Ще има актьори, които ще ви пипат, хващат, завличат и нагрубяват (няма да боли). В такива моменти основното правило е да не се съпротивлявате. Всеки опит за физическо посегателство ще доведе до незабавно прекратяване на играта за целия отбор. </p></td>
                        </tr>
                        <tr>
                            <td colspan="3"><h1 style="font-family: \'Lora\', sans-serif;font-size: 22px;margin-top: 30px;margin-left: 50px;color: white !important;"><span style="color: #be0000">2.</span> Гонят ли ви - бягайте</h1></td>
                        </tr>
                        <tr>
                            <td colspan="3"><p style="font-family: \'Lora\', sans-serif;font-size: 16px;width:70%;margin-top: 0px;margin-left: 50px;color: white !important;">Ще има моменти, в които на целия ви екип ще се наложи да бяга или да се крие. Чуете ли алармата, оставете всичко, с което се занимавате и хуквайте незабавно.
Внимание! Винаги трябва да има минимум един човек от отбора, който да бяга или злодеят ще ви открие и ще хване някой от вас! От изключителна важност е да не позволявате на актьора да ви сграбчва, в противен случай играта за хванатия ПРИКЛЮЧВА!</p></td>
                        </tr>
                        <tr>
                            <td colspan="3"><h1 style="font-family: \'Lora\', sans-serif;font-size: 22px;margin-top: 30px;margin-left: 50px;color: white !important;"><span style="color: #be0000">3.</span> Не скапвайте играта</h1></td>
                        </tr>
                        <tr>
                            <td colspan="3"><p style="font-family: \'Lora\', sans-serif;font-size: 16px;width:70%;margin-top: 0px;margin-left: 50px;color: white !important;">Ако някой актьор говори с вас, имайте предвид че това е част от играта и информацията, която той иска да ви сподели е от значителна важност за успешното протичане на геймплея.</p></td>
                        </tr>
                        <tr>
                            <td><div style="height: 200px;"></div></td>
                        </tr>
                    </table>
        </body>
        </html>';

        // Build the email headers.
        $email_headers = "From: SawRoom <contact@sawroom.bg>\r\n";
        $email_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers) && mail("contact@sawroom.bg", "SawRoom 3: New Reservation", $email_content_self, $email_headers)) {
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
