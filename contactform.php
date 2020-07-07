<?php

if (isset($_POST['submit'])){

    $fname = $_POST['f-name'];
    $lname = $_POST['l-name'];
    $country = $_POST['country'];
    //$email = $_POST['e-mail'];
    $message = $_POST['message'];

    //$mailTo = "telakshanb@gmail.com";

    $headers = "From: ".$fname;

    $txt = "You have received an email from ".$fname;


    mail();

}