<?php

namespace App\Http\Controllers;

use App\Models\Posting;
use Illuminate\Http\Request;

class PostingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postings = Posting::orderBy('posting_date', 'desc')->get();
        return response()->json($postings);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $posting = new Posting();

        $posting->value = $request->value;
        $posting->description = $request->description;
        $posting->posting_date = date('Y-m-d');

        $posting->save();

        return response()->json($posting);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $posting = Posting::findOrFail($id);
        return response()->json($posting);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Posting  $posting
     * @return \Illuminate\Http\Response
     */
    // public function edit(Posting $posting)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $posting = Posting::findOrFail($id);

        $posting->value = $request->value;
        $posting->description = $request->description;
        $posting->posting_date = date('Y-m-d');

        $posting->save();

        return response()->json($posting);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Posting  $posting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Posting $posting)
    {
        $posting = Posting::findOrFail($id);
        $posting->delete();
        return response()->json($posting);
    }
}
