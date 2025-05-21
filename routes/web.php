<?php

use App\Http\Controllers\GamePortalController;
use App\Http\Controllers\NoteController;
use App\Models\Game;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home', [
        'popularGames' => Game::take(5)->get(),
        'newReleasedGames' => Game::take(5)->get(),
    ]);
})->name('home');

Route::get('/browse-games', function () {
    return Inertia::render('dashboard');
})->name('browse-games');

Route::resource("/game", GamePortalController::class)
    ->names([
        'index' => 'game.index',
        'create' => 'game.create',
        'store' => 'game.store',
        'show' => 'game.show',
        'edit' => 'game.edit',
        'update' => 'game.update',
        'destroy' => 'game.destroy',
    ]);

Route::get('/notes', [NoteController::class, 'index'])->name('notes');
Route::get('/create-note', [NoteController::class, 'create'])->name('create-note');
Route::post('/store-note', [NoteController::class, 'store'])->name('store-note');
Route::get('/edit-note/{note}', [NoteController::class, 'edit'])->name('edit-note');
Route::patch('/update-note/{note}', [NoteController::class, 'update'])->name('update-note');
Route::delete('/delete-note/{note}', [NoteController::class, 'destroy'])->name('delete-note');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
