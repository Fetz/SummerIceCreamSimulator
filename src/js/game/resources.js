var resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	
	{
		name: 'title_screen',
		type: 'image',
		src: 'data/img/uk_blank_map.gif'
	},

	{
		name: 'map_icons',
		type: 'image',
		src: 'data/img/sprites/map.png'
	},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"}
	 */
	
	{
		name: 'level01',
		type: 'tmx',
		src: 'data/map/map.tmx'
	}

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];

module.exports = resources;
