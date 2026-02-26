<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('student/index');
});

Route::get('/aspirasi/create', function () {
    return inertia('student/aspirasi/create');
});

Route::get('/aspirasi/history', function () {
    return inertia('student/aspirasi/history');
});
