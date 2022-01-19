const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./kirby.png");
ASSET_MANAGER.queueDownload("./left_walk.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	
	// sets background
	var background = document.getElementById("gameWorld").style.backgroundImage="url('./land.png')";
	document.getElementById("gameWorld").style.backgroundSize="1024px 768px";

	gameEngine.addEntity(new Kirby(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});
