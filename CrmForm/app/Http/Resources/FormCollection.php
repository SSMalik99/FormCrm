<?php

namespace App\Http\Resources;

use App\Utility\General;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\Paginator;

class FormCollection extends ResourceCollection
{
    public $links = [];

    public function __construct($collection) {
         
        parent::__construct($collection->all());
        $this->links = General::generatePagination($collection);
        
    }

    
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "forms"=> $this->collection,
            "pagination" => $this->links
        ];
    }
}
