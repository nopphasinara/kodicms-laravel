<?php namespace KodiCMS\Support\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class EnvironmentTester
 * @package KodiCMS\Support\Facades
 */
class EnvironmentTester extends Facade {

	/**
	 * Get the registered name of the component.
	 *
	 * @return string
	 */
	protected static function getFacadeAccessor()
	{
		return 'installer.environment.tester';
	}
}
