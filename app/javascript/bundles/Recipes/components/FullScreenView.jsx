import React from "react";

export default class FullScreenView extends React.Component {
  constructor() {
    super();

    this.state = {
      fullscreenToggle: false,
    };
  }

  toggleFullscreen = (e) => {
    e.preventDefault();
    this.setState({
      fullscreenToggle: !this.state.fullscreenToggle,
    });
  }

  render() {
    const recipe = this.props.recipe;

    const ingredientsAndStepsSeperated = recipe.content.steps.map((step, stepIndex) => {
      const ingredients = step.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <div key={ingredientIndex} className="row">
            <div className="col-4">{ingredient.qty} {ingredient.unit}</div>
            <div className="col-8">{ingredient.name}</div>
          </div>);
      });
      return (
        <div className="row step-row" key={stepIndex}>
          <div className="col-xl-4 step-col" style={{ paddingLeft: 50 }}>{ingredients}</div>
          <div className="col-xl-8" style={{ paddingLeft: 40 }}>{stepIndex + 1}. {step.instructions}</div>
        </div>);
    });

    const allIngredients = recipe.content.steps.map((step, stepIndex) => {
      return step.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <div key={ingredientIndex} className="row">
            <div className="col-4">{ingredient.qty} {ingredient.unit}</div>
            <div className="col-8">{ingredient.name}</div>
          </div>);
      });
    });
    const allInstructions = recipe.content.steps.map((step, stepIndex) => {
      return (
        <div className="row" key={stepIndex}>
          <div className="col-xl-8" >{stepIndex + 1}. {step.instructions}</div>
        </div>);
    });

    const allIngredientsAndStepsGrouped = (
      <div className="row step-row">
        <div className="col-xl-4 step-col" style={{ paddingLeft: 50 }}>{allIngredients}</div>
        <div className="col-xl-8" style={{ paddingLeft: 40 }}>{allInstructions}</div>
      </div>
    );

    return (
      <div className="cooking-view">
        <div className="container-fluid steps-ingredients-container">
          <div className="row">
            <div className="col-xl text-center"><h4>{recipe.title}</h4></div>
            <button type="button" className="btn btn-primary" onClick={this.toggleFullscreen} >Toggle</button>
          </div>
          <div className="row step-row">
            <div className="col-xl-4 step-col" style={{paddingLeft: 50 }}><h4>Ingredients:</h4></div>
            <div className="col-xl-8" style={{paddingLeft: 40}}><h4>Steps:</h4></div>
          </div>
          {(this.state.fullscreenToggle)?(allIngredientsAndStepsGrouped):(ingredientsAndStepsSeperated)}
        </div>
      </div>
    );
  }
}
