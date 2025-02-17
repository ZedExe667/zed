<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "zedexe667@gmail.com"; // ایمیل مقصد
    $subject = "پیام جدید از فرم تماس با ما";
    $message_body = "نام و فامیل: $name\n ایمیل: $email\n پیام: $message";
    $headers = "From: $email" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message_body, $headers)) {
        echo "پیام شما ارسال شد!";
    } else {
        echo "ارسال پیام با مشکل مواجه شد.";
    }
}
?>
