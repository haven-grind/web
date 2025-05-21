<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameDetail extends Model
{
    protected $table = "game_details";
    protected $fillable = [
        'game_id',
        'thumbnail',
        'screenshots',
    ];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'game_detail_genre');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'game_detail_tag');
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
