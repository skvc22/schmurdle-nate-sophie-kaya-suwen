<?php
   
    
    class schmurdle {

        protected $word;
        protected $guessesLeft;
        protected $guess;
        protected $wrongLetters = array();
        protected $deadLetters = array();
        protected $correctLetters = array();
        protected $gameWon = false;

        function __construct(){
            $this->word = "TOWEL";
            $this->guessesLeft = 5;
        }

        function getWord(){
            if($this->guessesLeft == 0){
                return $this->word;
            }
            else{
                return NULL;
            }
        }

        function getGuesses(){
            return $this->guessesLeft;
        }

        function getWrong(){
            return $this->wrongLetters;
        }

        function getCorrect(){
            return $this->correctLetters;
        }

        function getDead(){
            return $this->deadLetters;
        }

        function gameWon(){
            return $this->gameWon;
        }

        function check($guess){

            $this->removeGuess();

            $arr = array("", "", "", "", "");

            for($i = 0; $i < 5; $i++){
                  $character = substr($guess, $i, 1);

                if($arr[$i] == ""){
                    $arr[$i] = "dead";
                    if(strpos(substr($this->word, $i, 1), $character) !== false){
                        if(!in_array($character, $this->correctLetters)){
                            $this->correctLetters[] = $character;
                        }
                        $arr[$i] = "correct";
                    }
                    else{
                        $numInWord = 0;
                        $numCorrect = 0;

                        $wrong = array();

                        for($j = 0; $j < 5; $j++){
                            if(substr($this->word, $j, 1) == $character){
                                $numInWord += 1;
                            }
                        }

                        for($j = 0; $j < 5; $j++){
                            if(substr($guess, $j, 1) == $character){
                                if(strpos(substr($this->word, $j, 1), $character) !== false){
                                    $numCorrect += 1;
                                    $arr[$j] = "correct";
                                }
                                else{
                                    $wrong[] = $j;
                                }
                            }
                        }

                        $numWrong = $numInWord - $numCorrect;

                        for($j = 0; $j < $numWrong && $j < count($wrong); $j++){
                            if(!in_array($character, $this->wrongLetters)){
                                $this->wrongLetters[] = $character;
                            }
                            $arr[$wrong[$j]] = "wrong";
                            unset($wrong[$j]);
                        }
                        for($j = 0; $j < count($wrong); $j++){
                            $arr[$wrong[$j]] = "dead";
                        }
                    }
                }
            }

            for($i = 0; $i < 5; $i++){
                if($arr[$j] != "correct"){
                    break;
                }
                if($i == 4){
                    $this->gameWon = true;
                }
            }

            return $arr;
        }

        protected function removeGuess(){
            $this->guessesLeft -= 1;
        }
      //  $currentGuess = $_POST['guess'];
    }
    
    $test = new schmurdle();
    
    //print_r($test->check("OOOXO"));

    $input = $_REQUEST["q"];

    if($input == "getWord"){
        echo $test->getWord();
    }elseif($input == "getNumGuesses"){
        echo $test->getGuesses();
    }elseif($input == "gameWon"){
        echo $test->gameWon();
    }else{
        echo json_encode($test->check($_REQUEST["q"]));
    }
?>