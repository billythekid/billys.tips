<?php
/**
 * UpdateNotifier plugin for Craft CMS
 * UpdateNotifier Controller
 *
 * @author    Billy Fagan
 * @copyright Copyright (c) 2017 Billy Fagan
 * @link      https://billyfagan.co.uk
 * @package   UpdateNotifier
 * @since     1.0.0
 */

namespace Craft;

class UpdateNotifierController extends BaseController
{

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     * @access protected
     */
    protected $allowAnonymous = array('actionGetUpdates',);

    /**
     */
    public function actionGetUpdates()
    {

        $this->requirePostRequest();

        $allowedDomain = craft()->plugins->getPlugin('updatenotifier')->getSettings()->allowedDomain;
        $allowedDomain = !empty(trim($allowedDomain)) ? $allowedDomain : '*';

        if (!function_exists('getallheaders'))  {
            function getallheaders()
            {
                if (!is_array($_SERVER)) {
                    return array();
                }

                $headers = array();
                foreach ($_SERVER as $name => $value) {
                    if (substr($name, 0, 5) == 'HTTP_') {
                        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                    }
                }
                return $headers;
            }
        }
        Craft::dd(getallheaders());

        header("Access-Control-Allow-Origin: {$allowedDomain}");

        $secretKey = craft()->plugins->getPlugin('updatenotifier')->getSettings()->secretKey;

        if ($_POST['updatenotifierkey'] !== $secretKey)
        {
            exit(403);
        }

        // okay this is us, let's see if there are updates and return them
        $updates = false;
        try
        {
            craft()->updates->flushUpdateInfoFromCache();
            $updates = craft()->updates->getUpdates(true);
        } catch (EtException $e)
        {
            if ($e->getCode() == 10001)
            {
                $this->returnErrorJson($e->getMessage());
            }
        }

        if ($updates)
        {
            $response                     = $updates->getAttributes();
            $response['allowAutoUpdates'] = craft()->config->allowAutoUpdates();

            $this->returnJson($response);
        } else
        {
            $this->returnErrorJson(Craft::t('Could not fetch available updates at this time.'));
        }
    }


}