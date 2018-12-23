@extends('layouts.app')

@section('content')
<div class="md:flex md:justify-around">
  <div class="w-full max-w-md">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-grey-darker text-xxl font-normal mb-4">Projects</h2>
      <hr class="border-b my-4">
      <div class="card-body">
        @if (session('status'))
        <div class="alert alert-success" role="alert">
          {{ session('status') }}
        </div>
        @endif

        @forelse($projects as $project)
          <p><a href="/projects/{{ $project->id}}" class="no-underline py-4 text-black block hover:bg-grey-lighter">{{ $project->name}}</a></p>
        @empty
          <p class="mb-0">No projects have been created yet&hellip;</p>
        @endforelse
      </div>
    </div>
  </div>
  <div class="w-full max-w-md">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" action="/projects">
      {{ csrf_field() }}
      <h2 class="text-grey-darker text-xxl font-normal mb-4">Create new project</h2>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          Project name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Cool new project" name="name">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          Description
        </label>
        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="This project will be well planned and go without a hitch..." rows="4" name="description"></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Create
        </button>
      </div>
    </form>
  </div>
</div>
@endsection
