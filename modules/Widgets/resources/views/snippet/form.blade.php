<div class="panel-heading">
	<div class="form-group form-group-lg">
		<label for="name" class="col-sm-2 control-label">@lang('widgets::snippet.field.name')</label>
		<div class="col-sm-10">
			<div class="input-group">
				{!! Form::text('name', NULL, [
				'class' => 'form-control sluggify', 'id' => 'name'
				]) !!}
				<span class="input-group-addon">{{ $snippet->getExt() }}</span>
			</div>
		</div>
	</div>
</div>
@if (!$snippet->isReadOnly() OR $snippet->isNew())
<div class="panel-toggler text-center panel-heading" data-target-spoiler=".spoiler-settings">
	{!! UI::icon('chevron-down panel-toggler-icon') !!} <span class="muted">@lang('widgets::snippet.label.settings')</span>
</div>
<div class="panel-spoiler spoiler-settings panel-body">
	<div class="form-group">
		<label class="col-md-3 control-label">@lang('widgets::snippet.label.wysiwyg')</label>
		<div class="col-md-9">
			{!! Form::select('editor', WYSIWYG::htmlSelect(), NULL, [
				'class' => 'form-control'
			]) !!}
		</div>
	</div>
	<div class="form-group">
		<label class="col-md-3 control-label">@lang('widgets::snippet.label.roles')</label>
		<div class="col-md-9">
			{!! Form::select('roles[]', $roles, NULL, [
				'class' => 'form-control', 'multiple'
			]) !!}
		</div>
	</div>

	<hr class="panel-wide" />
</div>
@endif
<div class="panel-heading">
	<span class="panel-title">@lang('widgets::snippet.field.content')</span>
	{!! UI::badge($snippet->getRelativePath()) !!}

	@if ($snippet->isReadOnly() OR $snippet->isNew())
		<div class="panel-heading-controls">
			{!! Form::button(trans('widgets::snippet.button.filemanager'), [
			'data-icon' => 'folder-open',
			'data-el' => 'textarea_content',
			'class' => 'btn btn-filemanager btn-flat btn-info btn-sm'
			]) !!}
		</div>
	@endif
</div>
{!! Form::textarea('content', NULL, [
'class' => 'form-control',
'id' => 'textarea_content',
'data-height' => 600,
'data-readonly' => (!$snippet->isNew() AND $snippet->isReadOnly()) ? 'on' : 'off'
]) !!}

@if(!$snippet->isNew() AND $snippet->isReadOnly())
	<div class="panel-default alert alert-danger alert-dark no-margin-b">
		<?php echo __('File is not writable'); ?>
	</div>
@elseif (acl_check('snippet.edit'))
	<div class="form-actions panel-footer">
		@include('cms::app.blocks.actionButtons', ['route' => 'backend.snippet.list'])
	</div>
@endif