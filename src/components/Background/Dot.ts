export class Dot {
	x: number;
	y: number;
	dx: number;
	dy: number;
	size: number;
	speed: number;
	minSpeed: number;
	clientWidth: number;
	clientHeight: number;

	constructor(
		_speed: number,
		_size: number,
		_clientWidth: number,
		_clientHeight: number
	) {
		this.x = _clientWidth / 2;
		this.y = _clientHeight / 2;

		const initialSpeed = _speed * 2.5;
		this.dx = Math.random() * initialSpeed - initialSpeed / 2;
		this.dy = Math.random() * initialSpeed - initialSpeed / 2;

		this.size = _size;
		this.speed = _speed;
		this.minSpeed = 0.01 * _speed;

		this.clientWidth = _clientWidth;
		this.clientHeight = _clientHeight;
	}

	animate() {
		const {
			x,
			y,
			dx,
			dy,
			size,
			speed,
			clientWidth: w,
			clientHeight: h,
			minSpeed,
		} = this;

		if (Math.abs(dx) < speed)
			this.dx += Math.random() * 0.1 * speed - 0.05 * speed;
		if (Math.abs(dx) > minSpeed) this.dx *= 0.994;

		if (Math.abs(dy) < speed)
			this.dy += Math.random() * 0.1 * speed - 0.05 * speed;
		if (Math.abs(dy) > minSpeed) this.dy *= 0.994;

		if (x < -size) this.x = w + size;
		else if (x > w + size) this.x = -size;
		else this.x += 10 * dx;

		if (y < -size) this.y = h + size;
		else if (y > h + size) this.y = -size;
		else this.y += 10 * dy;

		setTimeout(this.animate, 1000);
	}
}
