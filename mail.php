<?php 
if($_POST && isset($_POST['submit'])) {

    Error_Reporting(E_ALL & ~E_NOTICE);
    // $adresat = 'foxface2015@mail.ru';
    $adresat = 'Polinakomic@gmail.com';
    $thm = 'Запись на урок!';
    $status = 'Спасибо!';
    
    
    if (empty($_POST['tel'])) {
       exit("Введите номер телефона");
    }

    $name = isset($_POST['name']) ? htmlspecialchars(stripslashes($_POST['name'])) : '';
    $tel = isset($_POST['tel']) ? htmlspecialchars(stripslashes($_POST['tel'])) : '';

    $msg = "\n\nИмя: $name\n\nМой тел: $tel";

    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From:$name \r\n";
    $headers .= "Bcc: $adresat \r\n"; 
    mail($adresat, $thm, $msg, $headers);

    echo "<center><br><br><br><br><b>Ваше письмо отправлено!</b><br>";
    echo "$status<br><br>";
    header('Refresh: 2; URL=http://shangriyoga.by/');
}
?>
