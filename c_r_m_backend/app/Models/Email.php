<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;

    protected $fillable = [
    'subject',
    'recipient_name',
    'recipient_email',
    'sender_name',
    'sender_email',
    'body',
    'status',
    'sent_at',
  ];
}