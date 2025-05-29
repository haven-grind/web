<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Screenshot extends Model
{
    /** @use HasFactory<\Database\Factories\ScreenshotFactory> */
    use HasFactory;

    protected $table = "screenshots";
    protected $fillable = [
        'game_detail_id',
        'image_url',
    ];

    public function gameDetail()
    {
        return $this->belongsTo(GameDetail::class);
    }
}
