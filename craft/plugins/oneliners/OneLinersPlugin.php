<?php
/**
 * One Liners plugin for Craft CMS
 *
 * Spits out a random one-liner for use anywhere you like
 *
 * @author    Billy Fagan
 * @copyright Copyright (c) 2016 Billy Fagan
 * @link      https://billyfagan.co.uk
 * @package   OneLiners
 * @since     1.0.0
 */

namespace Craft;

class OneLinersPlugin extends BasePlugin
{
    /**
     * @return mixed
     */
    public function init()
    {
    }

    /**
     * @return mixed
     */
    public function getName()
    {
         return Craft::t('One Liners');
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return Craft::t('Spits out a random one-liner for use anywhere you like');
    }

    /**
     * @return string
     */
    public function getDocumentationUrl()
    {
        return 'https://github.com/billythekid/oneliners/blob/master/README.md';
    }

    /**
     * @return string
     */
    public function getReleaseFeedUrl()
    {
        return 'https://raw.githubusercontent.com/billythekid/oneliners/master/releases.json';
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return '1.0.0';
    }

    /**
     * @return string
     */
    public function getSchemaVersion()
    {
        return '1.0.0';
    }

    /**
     * @return string
     */
    public function getDeveloper()
    {
        return 'Billy Fagan';
    }

    /**
     * @return string
     */
    public function getDeveloperUrl()
    {
        return 'https://billyfagan.co.uk';
    }

    /**
     * @return bool
     */
    public function hasCpSection()
    {
        return false;
    }

    /**
     */
    public function onBeforeInstall()
    {
    }

    /**
     */
    public function onAfterInstall()
    {
    }

    /**
     */
    public function onBeforeUninstall()
    {
    }

    /**
     */
    public function onAfterUninstall()
    {
    }
}