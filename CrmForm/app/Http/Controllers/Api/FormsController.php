<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FormCollection;
use App\Http\Resources\FormResource;
use App\Models\Forms;
use App\Utility\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = 15;

        
        $query = Forms::whereUserId($request->user()->id);
        
        if($request->has("limit")){
            $limit = $request->query("limit");
        }
        
        if ($request->has('search')) {
            $query->where("form_name", "LIKE", "%" . $request->search . "%");
        }

        $formsCollection =  $query->paginate($limit);
        
        
        return $this->ApiResponse(new FormCollection($formsCollection));
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            "form_name" => [
                "required",
                "min:3",
                Rule::unique('forms')->where(function ($query) use ($request) {
                    return $query->where('user_id', $request->user()->id);
                })
            ],
            "form_data" => "nullable|json"
        ]);

        if ($validator->fails()) {
            return $this->ApiResponse(
                message:$validator->errors()->first(),
                success:false
            );
        }

        

        $formData = $request->get("form_data");
        
        
        if($formData != null){
            
            $validEachComponent = General::ValidateFormComponents($formData);
            
            if($validEachComponent!=null){
                return $this->ApiResponse(
                    message:$validEachComponent,
                    success:false
                );
            }

        }
        
        $validatedData = $validator->validate();
        $validatedData["user_id"] = $request->user()->id;


        $form = Forms::create($validatedData);
        return $this->ApiResponse(new FormResource($form), "Form Created Successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $form = Forms::find($id);
       
        if (!$form) {
            throw new NotFoundHttpException("Form not found");
        }

        return $this->ApiResponse(
            data: new FormResource($form),
            message:"Form loaded successfully."
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,int|string $id)
    {

        $form = Forms::find($id);
       
        if (!$form) {
            throw new NotFoundHttpException("Form not found");
        }

        
        
        $validator = Validator::make($request->all(), [
            "form_name" => [
                "min:3",
                Rule::unique('forms')
                    ->where(function ($query) use ($request) { // Capture $request
                        return $query->where('user_id', $request->user()->id);
                    })
                    ->ignore($form->id)
            ],
            "form_data" => "nullable|json"
        ]);


        

        if ($validator->fails()) {
            return $this->ApiResponse(
                message:$validator->errors()->first(),
                success:false
            );
        }

        $formData = $request->get("form_data");
        
        if($formData != null){
            
            $validEachComponent = General::ValidateFormComponents($formData);
            
            if($validEachComponent!=null){
                return $this->ApiResponse(
                    message:$validEachComponent,
                    success:false
                );
            }
            
        }

        $validatedData = array_filter($validator->validated(), fn($value) => !is_null($value));
        
        $form->update($validatedData);

        return $this->ApiResponse(data: new FormResource($form),message: "Form updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $form = Forms::find($id);
        
        if (!$form) {
            throw new NotFoundHttpException("Form not found");
        }
        $form->delete();
        return $this->ApiResponse(message:"Form Deleted Successfully.");
    }
}
