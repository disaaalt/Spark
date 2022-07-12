import SparkCondition from "../classes/SparkCondition";

/**
 * @param {string} name 
 */
export default function Condition(name: string) {
	return (construct) => {
		if(!(construct.prototype instanceof SparkCondition)) return;
		const _class = new construct;
		_class.name = name;
		
		global.Spark.conditions.set(name, _class);
	};
}