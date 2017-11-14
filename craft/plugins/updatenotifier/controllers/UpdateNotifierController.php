<?php
/**
 * UpdateNotifier plugin for Craft CMS
 * UpdateNotifier Controller
 *
 * @author    Billy Fagan
 * @copyright Copyright (c) 2017 Billy Fagan
 * @link      https://billyfagan.co.uk
 * @package   UpdateNotifier
 * @since     0.0.1
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


        header("Access-Control-Allow-Origin: {$allowedDomain}");
        $headers = $this->getallheaders();

        // set to * by default, if allowed domain is * it doesn't care.
        // If allowed domain is set to something, it won't match the * anyway.
        $origin = $headers['Origin'] ?? '*';

        if ($allowedDomain !== '*' && $origin !== trim($allowedDomain, '/'))
        {
            $this->returnErrorJson("Failed to load " . craft()->siteUrl . ": The 'Access-Control-Allow-Origin' header has a value '{$allowedDomain}' that is not equal to the supplied origin. Origin '{$origin}' is therefore not allowed access.");
        }

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
                // craft folder is not writable
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


    private function getAllHeaders()
    {
        if (!function_exists('getallheaders'))
        {
            if (!is_array($_SERVER))
            {
                return array();
            }

            $headers = array();
            foreach ($_SERVER as $name => $value)
            {
                if (substr($name, 0, 5) == 'HTTP_')
                {
                    $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                }
            }

            return $headers;
        }

        return getallheaders();
    }

}