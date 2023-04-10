<form onSubmit={onSubmit}>
    <input
    type="text"
    name="animal"
    placeholder="具材を入力してください"
    value={animalInput}
    onChange={(e) => setAnimalInput(e.target.value)}
    />
    <input type="submit" value="おすすめレシピを聞く" />
</form>