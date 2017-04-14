<?php
/**
 * Tips plugin for Craft CMS
 *
 * Site plugin for billys tips
 *
 * @author    billythekid
 * @copyright Copyright (c) 2017 billythekid
 * @link      https://billys.tips
 * @package   Tips
 * @since     1.0.0
 */

namespace Craft;

class TipsPlugin extends BasePlugin
{
    /**
     * @return mixed
     */
    public function init()
    {
        parent::init();
    }

    /**
     * @return mixed
     */
    public function getName()
    {
         return Craft::t('Tips');
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return Craft::t('Site plugin for billys tips');
    }

    /**
     * @return string
     */
    public function getDocumentationUrl()
    {
        return '???';
    }

    /**
     * @return string
     */
    public function getReleaseFeedUrl()
    {
        return '???';
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
        return 'billythekid';
    }

    /**
     * @return string
     */
    public function getDeveloperUrl()
    {
        return 'https://billys.tips';
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