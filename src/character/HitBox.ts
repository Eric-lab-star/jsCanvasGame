import { Vector } from "matter-js";

export interface HitBoxInterface {
  onFloor(): boolean;
  moveXDirection(newV: Vector, direction: number): Vector;
  moveDown(newV: Vector): Vector;
  moveUp(newV: Vector): Vector;
  setRight(value: boolean): void;
  setLeft(value: boolean): void;
  setUp(value: boolean): void;
  setDown(value: boolean): void;
  setAttack(value: string): void;
}

/**
 * `HitBox` is an abstract class that represents a hitbox in the game.
 * A hitbox is a region used to detect collisions with other objects.
 *
 * The class contains properties to track the direction of the hitbox and whether it has hit something.
 *
 * The constructor initializes these properties.
 * - `right`: A boolean that indicates if the hitbox is moving right.
 *   - Default value is `false`.
 * - `left`: A boolean that indicates if the hitbox is moving left.
 *   - Default value is `false`.
 * - `up`: A boolean that indicates if the hitbox is moving up.
 *   - Default value is `false`.
 * - `down`: A boolean that indicates if the hitbox is moving down.
 *  - Default value is `false`.
 * - `didRight`: A boolean that indicates if the hitbox has moved right.
 *  - Default value is `false`.
 * - `didLeft`: A boolean that indicates if the hitbox has moved left.
 *  - Default value is `false`.
 * - `didUp`: A boolean that indicates if the hitbox has moved up.
 *  - Default value is `false`.
 *
 * The class also contains abstract methods that must be implemented by any class that extends `HitBox`. These methods include:
 * - `onFloor()`: Detects if the hitbox is on the floor.
 * - `moveXDirection(newV: Vector, direction: number)`: Moves the hitbox in the X direction.
 * - `moveDown(newV: Vector)`: Moves the hitbox downwards.
 * - `moveUp(newV: Vector)`: Moves the hitbox upwards.
 * - `setRight(value: boolean)`: Sets the `right` property.
 * - `setLeft(value: boolean)`: Sets the `left` property.
 * - `setUp(value: boolean)`: Sets the `up` property.
 * - `setDown(value: boolean)`: Sets the `down` property.
 * - `setAttack(value: string)`: Sets the attack.
 */
export default abstract class HitBox {
  public right: boolean;
  public left: boolean;
  public up: boolean;
  public down: boolean;
  public didRight: boolean;
  public didLeft: boolean;
  public didUp: boolean;

  constructor() {
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.didRight = false;
    this.didLeft = false;
    this.didUp = false;
  }

  // detect if the body is on the floor
  public abstract onFloor(): boolean;

  public abstract moveXDirection(newV: Vector, direction: number): Vector;

  public abstract moveDown(newV: Vector): Vector;

  public abstract moveUp(newV: Vector): Vector;

  public abstract setRight(value: boolean): void;
  public abstract setLeft(value: boolean): void;
  public abstract setUp(value: boolean): void;
  public abstract setDown(value: boolean): void;

  public abstract setAttack(value: string): void;
}
