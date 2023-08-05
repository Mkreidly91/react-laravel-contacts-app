<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Symfony\Component\Mime\Message;

class ContactsController extends Controller
{
    function getAll()
    {
        try {
            $contacts = Contact::all();
            return response()->json([
                'status' => 'success',
                'contacts' => $contacts,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th,
            ], 500);
        }
    }

    function add(Request $request)
    {
        $request->validate(
            [
                "name" => "Required|string",
                "number" => "Required|string",
                'location' => 'required|string|regex:/^[a-zA-Z0-9\s\-,.]+$/',
            ]

        );

        $contact = new Contact;

        $contact->name = $request->name;
        $contact->number = $request->number;
        $contact->location = $request->location;
        $contact->image_url = $request->img;

        try {
            $contact->save();
            return response()->json([
                'message' => 'success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e,
            ], 500);
        }


    }

    function edit(Request $request, $id)
    {
        $request->validate([
            "name" => "nullable|string",
            "number" => "nullable|string",
            'location' => 'nullable|string|regex:/^[a-zA-Z0-9\s\-,.]+$/',

        ]);

        $contact = Contact::find($id);


        foreach ($request->all() as $field => $value) {

            if ($value) {
                $contact[$field] = $value;
            }
        }
        $contact->save();

        return response()->json([
            'message' => 'success',
            'updatedContact' => Contact::find($id)
        ], 200);

    }

    function delete($id)
    {
        try {
            Contact::destroy($id);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'user successfully deleted',

            ], 200);
        }

    }
}