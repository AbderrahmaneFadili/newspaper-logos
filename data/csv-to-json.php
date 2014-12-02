<?php

// games
$file = fopen("data.csv", "r");
$i = 0;
$buffer_male = array();
$buffer_female = array();
while (($data = fgetcsv($file, 1000, ',')) !== FALSE) {
	// echo '<pre>'.print_r($data).'</pre>';
	
	if ($i > 0 && $data[4] > 180000) {
		
		$result[sanitize($data[1])] = array(
			'image' => sanitize($data[1]).'.png',
			'name' => $data[1],
			'country' => $data[2],
			'continent' => $data[3],
			'readers' => $data[4],
			'founded' => $data[5],
			'color' => $data[6],
		);
		
	}
		
	$i++;
 
}


fclose($file);

echo json_encode($result);

file_put_contents('../site/data.json', json_encode($result));
/*
$fp = fopen('dataFiltered.csv', 'w');
foreach ($result as $fields) {
	if (is_file('../site/image/'.$fields['image'])) {
    	fputcsv($fp, $fields);
    }
}
*/

function sanitize($name){
	// Umlaute und leerzeichen ersetzen
	$umlaute = array("/è/","/é/","/à/","/ä/","/ö/","/ü/","/Ä/","/Ö/","/Ü/","/ß/", "/ /", "/\//", "/\./", "/\(/", "/\)/", "/,/", "/'/", "/í/");
	$replace = array("e","e","a","ae","oe","ue","Ae","Oe","Ue","ss", "", "-", "", "", "", "-", "", "i");
	$result = preg_replace($umlaute, $replace, $name);
	
	$result = strtolower($result);
			
	return $result;
}

?>
