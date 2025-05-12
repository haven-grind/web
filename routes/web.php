<?php

use App\Http\Controllers\GamePortalController;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::resource("/", GamePortalController::class)
    ->names([
        'index' => 'game.index',
        'create' => 'game.create',
        'store' => 'game.store',
        'edit' => 'game.edit',
    ])->except(['show', 'update', 'destroy']);
Route::get('/game/{game}', [GamePortalController::class, 'show'])->name('game.show');
Route::patch('/game/{game}', [GamePortalController::class, 'update'])->name('game.update');
Route::delete('/game/{game}', [GamePortalController::class, 'destroy'])->name('game.destroy');

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
