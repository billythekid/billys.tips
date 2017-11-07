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

        $secretKey = craft()->plugins->getPlugin('updatenotifier')->getSettings()->secretKey;

        if ($_POST['updatenotifierkey'] !== $secretKey)
        {
            exit(403);
        }

        // okay this is us, let's see if there are updates and return them
        $updates = false;
        try
        {
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