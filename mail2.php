<?php 
if($_POST && isset($_POST['submit'])) {

    Error_Reporting(E_ALL & ~E_NOTICE);
   //  $adresat = 'foxface2015@mail.ru';
    $adresat = 'Polinakomic@gmail.com';
    $thm = 'Запись на урок!';
    $status = 'Спасибо!';
    
    
    if (empty($_POST['tel'])) {
       exit("Введите номер телефона");
    }
    // проверяем правильности заполнения с помощью регулярного выражения
   //  if (!preg_match("/^[0-9 -^\.]{7,17}$/i", $_POST['tel'])) {
   //     exit("Введите номер телефона правильно. Можно использовать цифры 0-9, пробел, знаки: -, /");
   //  }

    if (empty($_POST['agree'])) {
       exit("Подтвердите соглашение с правилами");
    }

    $name = isset($_POST['name']) ? htmlspecialchars(stripslashes($_POST['name'])) : '';
    $tel = isset($_POST['tel']) ? htmlspecialchars(stripslashes($_POST['tel'])) : '';
    $age = isset($_POST['age']) ? htmlspecialchars(stripslashes($_POST['age'])) : '';
    $mail_msg = isset($_POST['mail_msg']) ? htmlspecialchars(stripslashes($_POST['mail_msg'])) : '';

    $msg = "\n\nИмя: $name\n\nМой тел: $tel\n\nМой возраст: $age\n\nСообщение: $mail_msg\n\nС правилами согласен";

    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From:$name \r\n";
    $headers .= "Bcc: $adresat \r\n"; 
    mail($adresat, $thm, $msg, $headers);

    echo "<center><br><br><br><br><b>Ваше письмо отправлено!</b><br>";
    echo "$status<br><br>";
    header('Refresh: 2; URL=http://shangriyoga.by/');
}
?>
