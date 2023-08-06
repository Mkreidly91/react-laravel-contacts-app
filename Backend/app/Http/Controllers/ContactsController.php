<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

use Illuminate\Support\Facades\Storage;

class ContactsController extends Controller
{
    function getAll()
    {
        try {
            $contacts = Contact::all();
            foreach ($contacts as $contact) {
                $img_url = $contact->image_url;
                if (Storage::disk('public')->exists($img_url)) {

                    $image = Storage::disk('public')->get($img_url);
                    $mimeType = Storage::disk('public')->mimeType($img_url);
                    $contact->image_url = 'data:' . $mimeType . ';base64,' . base64_encode($image);
                    ;
                }
            }
            return response()->json([
                'status' => 'success',
                'contacts' => $contacts,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    function add(Request $request)
    {
        $request->validate(
            [
                "name" => "Required|string",
                "number" => "Required|string",
                'location' => ['array'],
                'location.name' => 'required|string',
                'location.coordinates' => ['required', 'array', 'size:2'],
                'location.coordinates.lon' => 'required|numeric',
                'location.coordinates.lat' => 'required|numeric',
            ]

        );

        $contact = new Contact;

        $contact->name = $request->name;
        $contact->number = $request->number;
        $contact->location = json_encode($request->location);

        // Decode base 64
        $image_64 = $request->img;

        if ($image_64) {
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
            $replace = substr($image_64, 0, strpos($image_64, ',') + 1);
            $image = str_replace($replace, '', $image_64);
            $image = str_replace(' ', '+', $image);
            $filename = uniqid() . '.' . $extension;
            $image_url = 'images/' . $filename;
            Storage::disk('public')->put('images/' . $filename, base64_decode($image));
            $contact->image_url = $image_url;
        } else {
            $contact->image_url = "";
        }


        try {
            $contact->save();
            return response()->json([
                'message' => 'success'
            ], 200);
        } catch (\Exception $e) {
            dd($e);
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
            if ($field != 'img') {
                if ($value) {
                    $contact[$field] = $value;
                }
            }
        }

        if ($request->img) {

            if (!empty($imageData) && base64_decode($imageData, true)) {
                $imageExtension = explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
                $filename = uniqid() . '.' . $imageExtension;
                $decodedImage = base64_decode($imageData);
                $image_url = 'images/' . $filename;
                $contact->image_url = $image_url;
                Storage::disk('public')->put('images/' . $filename, $decodedImage);
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
            return response()->json([
                'message' => 'user successfully deleted',

            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th,
            ], 500);
        }

    }
}