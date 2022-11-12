<?php
class Product {
    private $id;

    public function __construct($name, $description, $price) { 

    }

    public function getID() {
        return $this->id;
    }

    public function setID(int $value) {
        $this->id = $value;
    }

    public function getName() {
        return $this->name;
    }

    public function setName(string $value) {
        $this->name = $value;
    }
    
    public function getDescription() {
        return $this->description;
    }

    public function setDescription(string $value) {
        $this->description = $value;
    }

    public function getPrice() {
        return $this->price;
    }

    public function getPriceFormatted() {
        $formatted_price = number_format($this->price, 2);
        return $formatted_price;
    }

    public function setPrice(float $value) {
        $this->price = $value;
    }
    
    public function getImageFilename() {
        $image_filename = $this->code . '_m.png';
        return $image_filename;
    }

    public function getImagePath(string $app_path) {
        $image_path = $app_path . 'images/' . $this->getImageFilename();
        return $image_path;
    }

    public function getImageAltText() {
        $image_alt = 'Image: ' . $this->getImageFilename();
        return $image_alt;
    }
}
?>