<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained('games')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('thumbnail')->nullable();
            $table->timestamps();
        });

        Schema::create('game_detail_genre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_detail_id')->constrained('game_details')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('genre_id')->constrained('genres')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_detail_genre');
        Schema::dropIfExists('game_details');
    }
};
