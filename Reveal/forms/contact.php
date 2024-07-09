<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Thay thế contact@example.com bằng địa chỉ email thực tế của bạn để nhận email
  $receiving_email_address = 'nhattan.b203@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }
 
  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Cấu hình SMTP để gửi email
  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => nhattan.b203@gmail.com',
    'password' => 'nhattan682003',
    'port' => '587'
  );

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  // Lưu dữ liệu vào tệp CSV
  $file = 'contacts.csv';
  $handle = fopen($file, 'a');
  if ($handle === false) {
    die('Unable to open or create the CSV file!');
  }
  $data = array($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'], date('Y-m-d H:i:s'));
  fputcsv($handle, $data);
  fclose($handle);

  // Gửi email và hiển thị kết quả
  echo $contact->send();
?>
