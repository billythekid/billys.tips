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
            'B', 'b',
            "\u{00DF}", "\u{0180}", "\u{0181}", "\u{0182}", "\u{0183}", "\u{0184}",
            "\u{0185}", "\u{0243}", "\u{0253}", "\u{025e}", "\u{03b2}", "\u{03d0}",
            "\u{03e6}", "\u{0411}", "\u{042a}", "\u{0431}", "\u{0432}",
            "\u{0462}", "\u{0463}",
        ],
        'i' => [
            'I', 'i',
            "\u{00A1}", "\u{00CC}", "\u{00CD}", "\u{00CE}", "\u{00CF}", "\u{00EC}",
            "\u{00ED}", "\u{00EE}", "\u{00EF}", "\u{0128}", "\u{0129}", "\u{012A}",
            "\u{012B}", "\u{012C}", "\u{012D}", "\u{012E}", "\u{012F}", "\u{0130}",
            "\u{0197}", "\u{01cf}", "\u{01d0}", "\u{0208}", "\u{0209}", "\u{020a}",
            "\u{020b}",
        ],
        'l' => [
            'L', 'l',
            "\u{00A6}", "\u{0139}", "\u{013A}", "\u{013B}", "\u{013C}", "\u{013D}",
            "\u{013E}", "\u{013F}", "\u{0140}", "\u{0141}", "\u{0142}", "\u{0196}",
            "\u{019A}", "\u{01AA}", "\u{0234}", "\u{023d}",
        ],
        'y' => [
            'Y', 'y',
            "\u{00A5}", "\u{00DD}", "\u{00FD}", "\u{00FF}", "\u{0176}", "\u{0177}",
            "\u{0178}", "\u{0194}", "\u{01B3}", "\u{01b4}", "\u{0232}", "\u{0233}",
            "\u{024e}", "\u{024f}", "\u{0263}", "\u{0264}", "\u{03b3}", "\u{03d2}",
            "\u{03d3}", "\u{03d4}",
        ],
        's' => [
            'S', 's',
            "\u{0024}", "\u{00A7}", "\u{015A}", "\u{015B}", "\u{015C}", "\u{015D}",
            "\u{015E}", "\u{015F}", "\u{0160}", "\u{0161}", "\u{01A7}", "\u{01A8}",
            "\u{0218}", "\u{0219}", "\u{023f}", "\u{03da}", "\u{03db}",
        ],
        't' => [
            'T', 't',
            "\u{0162}", "\u{0163}", "\u{0164}", "\u{0165}", "\u{0166}", "\u{0167}",
            "\u{01AB}", "\u{01AC}", "\u{01AE}", "\u{021a}", "\u{021b}", "\u{0236}",
            "\u{023e}", "\u{03ee}", "\u{03ef}",
        ],
        'p' => [
            'P', 'p',
            "\u{01bf}", "\u{01f7}", "\u{03a1}", "\u{03c1}", "\u{03fc}", "\u{0584}",
        ],
    ];

    /**
     */
    public function getWord($word)
    {
        $response = "";
        $letters  = str_split(strtolower($word));
        foreach ($letters as $letter)
        {
            $response .= (array_key_exists($letter, $this->letters)) ? $this->letters[$letter][array_rand($this->letters[$letter])] : $letter;
        }

        return $response;
    }

}