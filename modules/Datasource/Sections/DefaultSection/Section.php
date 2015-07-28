<?php namespace KodiCMS\Datasource\Sections\DefaultSection;

use KodiCMS\Datasource\Fields\Primitive\String;
use KodiCMS\Datasource\Sections\SectionToolbar;
use KodiCMS\Datasource\Fields\Primitive\Primary;
use KodiCMS\Datasource\Fields\Primitive\Boolean;
use KodiCMS\Datasource\Sections\SectionHeadline;
use KodiCMS\Datasource\Fields\Primitive\Timestamp;

class Section extends \KodiCMS\Datasource\Model\Section
{
	/**
	 * @var string
	 */
	protected $sectionTableName = 'default';

	/**
	 * @return string
	 */
	public function getDocumentClass()
	{
		return Document::class;
	}

	/**
	 * @return string
	 */
	public function getHeadlineClass()
	{
		return SectionHeadline::class;
	}

	/**
	 * @return string
	 */
	public function getToolbarClass()
	{
		return SectionToolbar::class;
	}

	/**
	 * @return array
	 */
	public function getSystemFields()
	{
		return [
			new Primary([
				'key' => 'id',
				'name' => 'ID',
				'settings' => [
					'headline_parameters' => [
						'width' => 30,
						'visible' => true
					]
				]
			]),
			new String([
				'key' => 'header',
				'name' => 'Header',
				'settings' => [
					'is_required' => true,
					'headline_parameters' => [
						'visible' => true
					]
				]
			]),
			new Boolean([
				'key' => 'published',
				'name' => 'Published',
				'settings' => [
					'headline_parameters' => [
						'width' => 30,
						'visible' => true
					]
				]
			]),
			new Timestamp([
				'key' => static::CREATED_AT,
				'name' => 'Created At',
				'settings' => [
					'headline_parameters' => [
						'width' => 200,
						'visible' => true
					]
				]
			]),
			new Timestamp([
				'key' => static::UPDATED_AT,
				'name' => 'Updated At',
				'settings' => [
					'headline_parameters' => [
						'width' => 200,
						'visible' => false
					]
				]
			])
		];
	}
}