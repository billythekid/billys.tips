<?php
/**
 * Created by PhpStorm.
 * User: btk
 * Date: 07/11/2017
 * Time: 16:43
 */

namespace Craft;
require CRAFT_FRAMEWORK_PATH . 'yii.php';

use \CDbConnection;


class UpdateNotifierHelper
{
    /**
     * This is used to allow configs to turn off the CSRF protection for hits to the thing
     *
     * @return bool
     */
    public static function isApiRequest()
    {

        $dbConfig = include CRAFT_CONFIG_PATH . 'db.php';

        // we need to find a better way to do this - this way sucks ass
        // we can't rely on the deets being in the '*' environment - or even that that environment exists!
        // need to replicate craft's way of working out what

        $dsn      = "mysql:dbname={$dbConfig['*']['database']};host={$dbConfig['*']['server']}";
        $username = $dbConfig['*']['user'];
        $password = $dbConfig['*']['password'];

        $connection         = new CDbConnection($dsn, $username, $password);
        $connection->active = true;
        $secretKey          = json_decode($connection->createCommand()
            ->select('settings')
            ->from('craft_plugins')
            ->where('class="UpdateNotifier"')
            ->queryRow()['settings'])->secretKey;

        return (
            !empty($_POST['updatenotifierkey']) &&
            $_POST['updatenotifierkey'] === $secretKey &&
            $secretKey !== "00000000-0000-0000-0000-000000000000" &&
            !empty($secretKey)

        );
    }
}