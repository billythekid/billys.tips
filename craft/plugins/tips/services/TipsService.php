<?php
/**
 * Tips plugin for Craft CMS
 * Tips Service
 *
 * @author    billythekid
 * @copyright Copyright (c) 2017 billythekid
 * @link      https://billys.tips
 * @package   Tips
 * @since     1.0.0
 */

namespace Craft;

class TipsService extends BaseApplicationComponent
{
    private $letters = [
        'b' => [
            'B', 'b', '\u{00DF}',
        ],
        'i' => [

        ],
        'l' => [

        ],
        'y' => [

        ],
        's' => [

        ],
        't' => [

        ],
        'p' => [

        ],
    ];

    /**
     */
    public function getWord($word)
    {
        $response = "";
        $letters = str_split(strtolower($word));
        foreach ($letters as $letter)
        {
            $response .= (array_key_exists($letter,$this->letters)) ? $this->letters[$letter][array_rand($this->letters[$letter])] : $letter;
        }
        return $response;
    }

}