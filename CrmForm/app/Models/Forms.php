<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Forms extends Model
{
    
   protected $guarded = [];

   protected $casts = [
      'form_data' => 'array'
   ];
   

   public function user(): BelongsTo
   {
      return $this->belongsTo(User::class);
   }
}
