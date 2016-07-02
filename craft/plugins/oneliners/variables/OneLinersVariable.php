<?php
/**
 * One Liners plugin for Craft CMS
 * One Liners Variable
 *
 * @author    Billy Fagan
 * @copyright Copyright (c) 2016 Billy Fagan
 * @link      https://billyfagan.co.uk
 * @package   OneLiners
 * @since     1.0.0
 */

namespace Craft;

class OneLinersVariable
{
    /**
     * Pulls a one liner from the text file.
     * @param int $line
     * @return
     */
    public function get(int $line = -1)
    {
        $oneLiners = file(__DIR__ . '/../resources/oneLiners.txt', FILE_SKIP_EMPTY_LINES);
        $line      = ($line > count($oneLiners) - 1) ? count($oneLiners) - 1 : $line;

        return ($line > -1) ? $oneLiners[$line] : $oneLiners[array_rand($oneLiners)];
    }
}