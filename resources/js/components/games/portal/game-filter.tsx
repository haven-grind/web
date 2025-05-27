import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Genre } from '@/types';

export function GameFilter({ genres }: { genres: Genre[] }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-3 text-lg font-semibold">Filter Games</h3>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Apply Filters</Button>
            </div>

            <Separator />

            <Accordion type="multiple" defaultValue={['category', 'sort']}>
                <AccordionItem value="category">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {genres.map((genre) => (
                                <div key={genre.id} className="flex items-center space-x-2">
                                    <Checkbox id={`category-${genre.id}`} />
                                    <Label htmlFor={`category-${genre.id}`}>{genre.name}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sort">
                    <AccordionTrigger>Sort By</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup defaultValue="popular" className="grid gap-3">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="popular" id="sort-popular" />
                                <Label htmlFor="sort-popular">Most Popular</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="newest" id="sort-newest" />
                                <Label htmlFor="sort-newest">Newest</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="oldest" id="sort-oldest" />
                                <Label htmlFor="sort-oldest">Oldest</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="price-low" id="sort-price-low" />
                                <Label htmlFor="sort-price-low">Price: Low to High</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="price-high" id="sort-price-high" />
                                <Label htmlFor="sort-price-high">Price: High to Low</Label>
                            </div>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
