import SparkEvent from "../classes/SparkEvent";
import { SparkSubscribeOptions } from "../interfaces/SparkSubscribeOptions";

/**
 * @param {SparkSubscribeOptions} options 
 */
export default function Subscribe(options: SparkSubscribeOptions) {
	return (construct) => {
		if(!(construct.prototype instanceof SparkEvent)) return;
		const _class = new construct;
		_class.options = options;

		global.Spark.events.push(_class);
	};
}