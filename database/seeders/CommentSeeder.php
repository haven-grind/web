<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::factory()->count(50)
            ->recycle(User::all())
            ->recycle(Game::all())
            ->create();
    }
}
