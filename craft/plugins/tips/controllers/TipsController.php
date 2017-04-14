<?php
/**
 * Tips plugin for Craft CMS
 *
 * Tips Controller
 *
 * @author    billythekid
 * @copyright Copyright (c) 2017 billythekid
 * @link      https://billys.tips
 * @package   Tips
 * @since     1.0.0
 */

namespace Craft;

class TipsController extends BaseController
{

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     * @access protected
     */
    protected $allowAnonymous = array('actionIndex',
        );

    /**
     */
    public function actionIndex()
    {
    }
}