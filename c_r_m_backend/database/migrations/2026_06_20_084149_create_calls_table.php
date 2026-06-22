<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->string('caller_name');
            $table->string('caller_number');
            $table->string('receiver_name');
            $table->string('receiver_number');
            $table->integer('duration')->default(0); // Duration in seconds
            $table->string('status'); // 'answered', 'missed', 'voicemail', 'rejected'
            $table->text('notes')->nullable();
            $table->timestamp('call_time');
            $table->string('direction')->default('outbound'); // 'inbound' or 'outbound'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calls');
    }
};