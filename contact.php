<?php
header('Content-Type: application/json');
require('autoload.php');
require 'PHPMailerAutoload.php';
require("phpmailer/class.phpmailer.php");

$recaptchaSecret = '6Le05JcUAAAAAKroMqWg2GvTDUUyCRBsWTlpB6MQ';

//error_reporting(E_ALL & ~E_NOTICE);
try {
    // validate the ReCaptcha, if something is wrong, we throw an Exception,
    // i.e. code stops executing and goes to catch() block
    if (!isset($_POST['g-recaptcha-response'])) {
    throw new \Exception('ReCaptcha is not set.');
    }
    // do not forget to enter your secret key from https://www.google.com/recaptcha/admin

    $recaptcha = new \ReCaptcha\ReCaptcha($recaptchaSecret, new \ReCaptcha\RequestMethod\CurlPost());

    // we validate the ReCaptcha field together with the user's IP address

    $response = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
    if (!$response->isSuccess()) {
    /*
    Uncomment this to see the error codes if you have troubles with the implementation.
    I recommend not to display the error codes on production, though.
    $errors = $response->getErrorCodes();
    throw new \Exception('ReCaptcha returned error: ', implode(',', $errors));
    */
    throw new \Exception('ReCaptcha was not validated.');
    }
    try {
        $mail = new PHPMailer(); 
        //Server settings
        //$mail->SMTPDebug = 4;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'mail.lgdesign.com.ar';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'web@lgdesign.com.ar';                 // SMTP username
        $mail->Password = 'LGlea2019';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to
        $mail->CharSet = 'UTF-8';                 // TCP port to connect to

        //587 default
        //Recipients
        $mail->setFrom('web@lgdesign.com.ar');
        //$mail->addAddress('lg.design.web@gmail.com', 'Mensaje de la Web San ber');     // Add a recipient
        $mail->addAddress('sanber.monoambiente@gmail.com', 'Mensaje de la Web');     // Add a recipient
        //$mail->addAddress('mcgarcia45@hotmail.com', 'Mensaje de la Web');     // Add a recipient
        
        $user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
        
        $mail->addReplyTo($user_Email);
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');

        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

        //Content
        $mail->isHTML(true);                                  // Set email format to HTML

        $user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);

        $user_Phone =  $_POST["userTelephone"];
        // $user_Subject =  $_POST["userSubject"];
        $user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
        $message_Body = "<strong>Nombre: </strong>". $user_Name ."<br>";
        $message_Body .= "<strong>Email: </strong>". $user_Email . "<br>";
        $message_Body .= "<strong>Telefono: </strong>". $user_Phone . "<br>";
        // $message_Body .= "<strong>Asunto: </strong>". $user_Subject . "<br>";
        $message_Body .= "<strong>Mensaje: </strong>". $user_Message . "<br>";

        $mail->Subject = 'Mail de web San Ber';

        $mail->Body    = $message_Body;
        $mail->AltBody = $message_Body;
        $output = json_encode(array('type'=>"message", 'text' => "Buen dia ".$user_Name ." Gracias por contactarnos."));

        if($mail->send()){
            die($output);
        }
    } catch (Exception $e) {
        $output = json_encode(array('type'=>'error', 'text' => 'Hubo un error al enviar el email, por favor contactarse por otro medio.'));
        die($output);
    }
} catch (Exception $e) {
    $output = json_encode(array('type'=>'error', 'text' => 'Hubo un error al enviar el captcha, por favor volver a intentar o contactarse por otro medio.'));
    die($output);
}
?>
