"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
console.log("Hola soy JavaScript");
var valor1;
for (var i; i < 10; i++) {
  console.log(i);
}
var numer01;
var constante = 23;
var nombre = "Carla Valverth";
console.log('Hola ' + nombre);
var flock;
function setup() {
  createCanvas(640, 360);
  createP('Drag the mouse to generate new boids.');
  flock = new Flock();

  // Add an initial set of boids into the system
  for (var _i = 0; _i < 100; _i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
  describe('A group of bird-like objects, represented by triangles, moving across the canvas, modeling flocking behavior.');
}
function draw() {
  background(0);
  flock.run();
}

// On mouse drag, add a new boid to the flock
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// Flock class to manage the array of all the boids
var Flock = /*#__PURE__*/function () {
  function Flock() {
    _classCallCheck(this, Flock);
    // Initialize the array of boids
    this.boids = [];
  }
  return _createClass(Flock, [{
    key: "run",
    value: function run() {
      var _iterator = _createForOfIteratorHelper(this.boids),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var boid = _step.value;
          // Pass the entire list of boids to each boid individually
          boid.run(this.boids);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "addBoid",
    value: function addBoid(b) {
      this.boids.push(b);
    }
  }]);
}();
var Boid = /*#__PURE__*/function () {
  function Boid(x, y) {
    _classCallCheck(this, Boid);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.size = 3.0;

    // Maximum speed
    this.maxSpeed = 3;

    // Maximum steering force
    this.maxForce = 0.05;
    colorMode(HSB);
    this.color = color(random(256), 255, 255);
  }
  return _createClass(Boid, [{
    key: "run",
    value: function run(boids) {
      this.flock(boids);
      this.update();
      this.borders();
      this.render();
    }
  }, {
    key: "applyForce",
    value: function applyForce(force) {
      // We could add mass here if we want: A = F / M
      this.acceleration.add(force);
    }

    // We accumulate a new acceleration each time based on three rules
  }, {
    key: "flock",
    value: function flock(boids) {
      var separation = this.separate(boids);
      var alignment = this.align(boids);
      var cohesion = this.cohesion(boids);

      // Arbitrarily weight these forces
      separation.mult(1.5);
      alignment.mult(1.0);
      cohesion.mult(1.0);

      // Add the force vectors to acceleration
      this.applyForce(separation);
      this.applyForce(alignment);
      this.applyForce(cohesion);
    }

    // Method to update location
  }, {
    key: "update",
    value: function update() {
      // Update velocity
      this.velocity.add(this.acceleration);

      // Limit speed
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);

      // Reset acceleration to 0 each cycle
      this.acceleration.mult(0);
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
  }, {
    key: "seek",
    value: function seek(target) {
      // A vector pointing from the location to the target
      var desired = p5.Vector.sub(target, this.position);

      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxSpeed);

      // Steering = Desired minus Velocity
      var steer = p5.Vector.sub(desired, this.velocity);

      // Limit to maximum steering force
      steer.limit(this.maxForce);
      return steer;
    }
  }, {
    key: "render",
    value: function render() {
      // Draw a triangle rotated in the direction of velocity
      var theta = this.velocity.heading() + radians(90);
      fill(this.color);
      stroke(255);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.size * 2);
      vertex(-this.size, this.size * 2);
      vertex(this.size, this.size * 2);
      endShape(CLOSE);
      pop();
    }

    // Wraparound
  }, {
    key: "borders",
    value: function borders() {
      if (this.position.x < -this.size) {
        this.position.x = width + this.size;
      }
      if (this.position.y < -this.size) {
        this.position.y = height + this.size;
      }
      if (this.position.x > width + this.size) {
        this.position.x = -this.size;
      }
      if (this.position.y > height + this.size) {
        this.position.y = -this.size;
      }
    }

    // Separation
    // Method checks for nearby boids and steers away
  }, {
    key: "separate",
    value: function separate(boids) {
      var desiredSeparation = 25.0;
      var steer = createVector(0, 0);
      var count = 0;

      // For every boid in the system, check if it's too close
      var _iterator2 = _createForOfIteratorHelper(boids),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var boid = _step2.value;
          var distanceToNeighbor = p5.Vector.dist(this.position, boid.position);

          // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
          if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation) {
            // Calculate vector pointing away from neighbor
            var diff = p5.Vector.sub(this.position, boid.position);
            diff.normalize();

            // Scale by distance
            diff.div(distanceToNeighbor);
            steer.add(diff);

            // Keep track of how many
            count++;
          }
        }

        // Average -- divide by how many
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (count > 0) {
        steer.div(count);
      }

      // As long as the vector is greater than 0
      if (steer.mag() > 0) {
        // Implement Reynolds: Steering = Desired - Velocity
        steer.normalize();
        steer.mult(this.maxSpeed);
        steer.sub(this.velocity);
        steer.limit(this.maxForce);
      }
      return steer;
    }

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
  }, {
    key: "align",
    value: function align(boids) {
      var neighborDistance = 50;
      var sum = createVector(0, 0);
      var count = 0;
      for (var _i2 = 0; _i2 < boids.length; _i2++) {
        var d = p5.Vector.dist(this.position, boids[_i2].position);
        if (d > 0 && d < neighborDistance) {
          sum.add(boids[_i2].velocity);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxSpeed);
        var steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxForce);
        return steer;
      } else {
        return createVector(0, 0);
      }
    }

    // Cohesion
    // For the average location (i.e., center) of all nearby boids, calculate steering vector towards that location
  }, {
    key: "cohesion",
    value: function cohesion(boids) {
      var neighborDistance = 50;
      var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
      var count = 0;
      for (var _i3 = 0; _i3 < boids.length; _i3++) {
        var d = p5.Vector.dist(this.position, boids[_i3].position);
        if (d > 0 && d < neighborDistance) {
          sum.add(boids[_i3].position); // Add location
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        return this.seek(sum); // Steer towards the location
      } else {
        return createVector(0, 0);
      }
    }
  }]);
}(); // class Boid