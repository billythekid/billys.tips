<?php
/**
 * UpdateNotifier plugin for Craft CMS
 * Plugin to let you know if your CMSes/plugins need updated
 *
 * @author    Billy Fagan
 * @copyright Copyright 2017 Billy Fagan
 * @link      https://billyfagan.co.uk
 * @package   UpdateNotifier
 * @since     0.0.1
 */

namespace Craft;

class UpdateNotifierPlugin extends BasePlugin
{


    /**
     * Runs any code needed to initialise the plugin
     */
    public function init()
    {
        parent::init();
    }


    /**
     * Gets the plugin's name
     *
     * @return string
     */
    public function getName()
    {
        return 'Update Notifier';
    }


    /**
     * Gets the plugin's description
     *
     * @return string
     */
    public function getDescription()
    {
        return 'Plugin to let you know if your CMSes/plugins need updated';
    }

    /**
     * The master readme URL
     *
     * @return string
     */
    public function getDocumentationUrl()
    {
        return 'https://github.com/billythekid/updatenotifier/blob/master/README.md';
    }

    /**
     * The release feed URL
     *
     * @return string
     */
    public function getReleaseFeedUrl()
    {
        return 'https://raw.githubusercontent.com/billythekid/updatenotifier/master/releases.json';
    }

    /**
     * Current plugin version
     *
     * @return string
     */
    public function getVersion()
    {
        return '0.0.1';
    }

    /**
     * Current DB/migration version
     *
     * @return string
     */
    public function getSchemaVersion()
    {
        return '0.0.1';
    }

    /**
     * This name looks like my name!
     *
     * @return string
     */
    public function getDeveloper()
    {
        return 'Billy Fagan';
    }

    /**
     * My website address
     *
     * @return string
     */
    public function getDeveloperUrl()
    {
        return 'https://billyfagan.co.uk';
    }

    /**
     * If the plugin has its own section in the dashboard
     *
     * @return bool
     */
    public function hasCpSection()
    {
        return false;
    }


    /**
     * Settable settings for the plugin
     *
     * @return array
     */
    protected function defineSettings()
    {
        return array(
            'secretKey'     => array(
                AttributeType::String,
                'label'    => 'Secret key',
                'default'  => '00000000-0000-0000-0000-000000000000',
                'required' => true,
            ),
            'allowedDomain' => array(
                AttributeType::String,
                'label'   => 'Restrict access to a specific domain',
                'default' => '',
            ),
        );
    }

    /**
     * Show the settings page
     *
     * @return mixed
     */
    public function getSettingsHtml()
    {
        return craft()->templates->render('updatenotifier/UpdateNotifier_Settings', array(
            'settings' => $this->getSettings(),
        ));
    }

    /**
     * If I need to make any changes to the settings before they get saved, this is where I'd do it.
     *
     * @param mixed $settings The plugin's settings
     * @return mixed
     */
    public function prepSettings($settings)
    {
        return $settings;
    }


}