@extends('layouts.app')

@section('postHeader')
  <div class="bg-grey-darkest px-8 py-10">
    <h1 class="text-white font-normal mb-4">
      {{ $project->name }}
    </h1>
    <p class="mb-0 text-white">{{ $project->cms->name }}</p>
  </div>
@endsection

@section('content')
  @forelse($types as $type)
    <div class="mb-10">
      <h2 class="text-5xl text-grey mb-4"><em>{{ str_plural($type->name) }}</em></h2>
      <div>
        <a href="#" class="flex items-center no-underline text-blue-darker">
          <i class="fas fa-plus-square fa-3x mr-4"></i>
          <span>Create new {{ $type->name }}</span>
        </a>
      </div>
    </div>
  @empty
    <p>This CMS has no types, please add some&hellip;</p>
  @endforelse
@endsection
