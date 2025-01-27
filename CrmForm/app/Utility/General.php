<?php

namespace App\Utility;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;

class General{

    
    public static function generatePagination(LengthAwarePaginator $models): array{
        return [
            "perPage" => $models->perPage(),
            "currentPage" => $models->currentPage(),
            "total" => $models->total(),
            "lastPage" => $models->lastPage(),
            "hasMorePages" => $models->hasMorePages()
        ];
    }

    public static function ValidateFormComponents(string $jsonString): string|null{

        
        
        $formComponents = json_decode($jsonString, true);
        
        $validator = Validator::make($formComponents, [
            '*' => [ 'array', 'required', 'min:3'],
            "*.stage_id" => "required|integer",
            "*.type" => "required|in:".implode(",", General::allInputType()),
            "*.validation" => "nullable|array",//this is the validation on the form input
            "*.label" => ["required"],
            "*.placeholder" => ["required"],
            "*.isRequired" =>["required", "boolean"],
        ], [
            '*' => [
                'array' => 'Each item must be an array.',
                'required' => 'Each item is required.',
                'min' => 'Each item must have at least type, label, placeholder and required property.',
            ],
        ]);

        if($validator->fails()){
            return $validator->errors()->first();
        }
        

        $validData = $validator->validate();

        foreach ($validData as $component) {
            
            if(array_key_exists("validation", $component)){
                // $formComponentValidation = $component["validation"];
                General::validateFormComponentValidation($component);
            };

        }
        
        return null;
        
    }

    public static function validateFormComponentValidation(array $component): string|null{

        //No need to implement for this assignment
        return null;
        // $type = $component["type"];
        // $rules = [];
        // switch ($type) {
        //     case "text":
        //     case "password":
        //         break;

        //     default:
        //         # code...
        //         break;
        // }
        // return null;
    }


    public static function availableValidationType(){
        
    }

    /**
     * Just going to keep it short for the assignment
     */
    public static function allInputType(): array{
        return [

            //simpleInput

            "text",
            "password",
            "email",
            "number",
            "range",
            
            //date specific
            "date",
            "month",
            // "week",
            "time",
            // "datetime-local",
            // "datetime",
            
            
            //
            //color specific
            // "color",
        
            // radio and checkbox
            "checkbox",
            "radio",
        
            //button
            // "submit",
            // "reset",
            // "button",
        
        
            //file
            "file",
            "image",
        
        
            // mulitline_text
            "textarea",
        
            // select
            // "select",
        ];
    }
}