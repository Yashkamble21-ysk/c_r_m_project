<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->string('recipient_name');
            $table->string('recipient_email');
            $table->string('sender_name');
            $table->string('sender_email');
            $table->text('body')->nullable();
            $table->string('status'); // 'sent', 'draft', 'failed', 'pending'
            $table->timestamp('sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emails');
    }
};